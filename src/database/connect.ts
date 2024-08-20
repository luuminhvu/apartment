import sequelize from "./db";
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
