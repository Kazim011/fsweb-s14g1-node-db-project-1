const dbConfig = require("../../data/db-config");

const getAll = async () => {
  // KODLAR BURAYA
  try {
    const records = await dbConfig("accounts");
    return records;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getById = async (id) => {
  // KODLAR BURAYA
  try {
    const record = await dbConfig("accounts").where("id", id).first();
    return record;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const create = async (account) => {
  // KODLAR BURAYA
  try {
    const insertIds = await dbConfig("accounts").insert(account);
    const newRecord = await getById(insertIds[0]);
    return newRecord;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateById = async (id, account) => {
  // KODLAR BURAYA
  try {
    await dbConfig("accounts").where("id", id).update(account);
    const updateRecord = await getById(id);
    return updateRecord;
  } catch (error) {
    return null;
  }
};

const deleteById = async (id) => {
  // KODLAR BURAYA
  try {
    await dbConfig("accounts").where("id", id).delete();
    const deleteRecord = await getById(id);
    return deleteRecord;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
