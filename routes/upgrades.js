const express = require("express");
const userBalance = require("./balance");
const router = express.Router();
const cors = require("cors");
const app = express();
app.use(express.json());
const upgrades = [
  {
    id: 1,
    name: "Click Accelerator",
    description: "speed of earning x10",
    price: 40000,
    type: "multiplyClick",
    value: 50,
  },
  {
    id: 2,
    name: "Coin Multiplayer",
    description: "ClickCoins per click x10",
    price: 40000,
    type: "multiplyPassive",
    value: 100,
  },
  {
    id: 3,
    name: "Power Tap",
    description: "ClickCoins per click x2",
    price: 10000,
    type: "addClick",
    value: 30,
  },
  {
    id: 4,
    name: "Golden Touch",
    description: "random bonus on click",
    price: 40000,
    type: "increasePassive",
    value: 30,
  },
  {
    id: 5,
    name: "Click Accelerator",
    description: "passive income x10",
    price: 40000,
    type: "increasePassive",
    value: 100,
  },
  {
    id: 6,
    name: "Mining Drone",
    description: "automated clicks for 1 min",
    price: 100000,
    type: "multiplyClick",
    value: 50,
  },
];
router.get("/", (req, res) => {
  return res.status(200).json({
    message: "OK",
    upgrades: upgrades,
  });
});
router.post("/buy-upgrade/:id", (req, res) => {
  const upgradeId = Number(req.params.id);
  const upgrade = upgrades.find((u) => u.id === Number(upgradeId));
  if (!upgrade) {
    return res.status(404).json({ message: "Upgrade not found" });
  }

  if (userBalance.balance < upgrade.price) {
    return res.status(400).json({ message: "Недостатньо коштів" });
  }

  // списываем цену
  userBalance.balance -= upgrade.price;

  // применяем эффект к userBalance
  switch (upgrade.type) {
    case "multiplyClick":
      userBalance.coinsPerClick *= upgrade.value;
      break;
    case "addClick":
      userBalance.coinsPerClick += upgrade.value;
      break;
    case "multiplyPassive":
      userBalance.passiveIncomePerSecond *= upgrade.value;
      break;
    case "addPassive":
      userBalance.passiveIncomePerSecond += upgrade.value;
      break;
    default:
      return res.status(409).json({ message: "Невірний тип ефекту" });
  }

  return res.status(200).json({
    message: "Успішна покупка",
    balance: userBalance.balance,
    coinsPerClick: userBalance.coinsPerClick,
    passiveIncomePerSecond: userBalance.passiveIncomePerSecond,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const specificUpgrade = upgrades.find((upgrade) => upgrade.id === id);
  return res.json(200).send({
    message: "OK",
    upgrade: specificUpgrade,
  });
});
router.post("/", (req, res) => {
  const upgrade = req.body;
  upgrades.push(upgrade);
  return res.status(201).send({
    message: "Created",
  });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const putUpgrade = req.body;
  const changeUpgrade = upgrades.findIndex(
    (upgrade) => upgrade.id === Number(id)
  );
  if (changeUpgrade !== -1) {
    upgrades[changeUpgrade] = putUpgrade;
    return res.json(201).send({
      message: "Created",
    });
  } else {
    return res.json(404).send({
      message: "Not Found",
    });
  }
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  return res.json(204).send({
    message: "No Content",
  });
});
module.exports = router;
