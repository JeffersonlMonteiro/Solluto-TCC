const { Log, Tabela } = require('../models');

async function registrarLog(USU_INT_ID, LOG_VAR_TIPOALT, LOG_ENUM_TABLE_ALT, LOG_JSONB_ANTDATA, LOG_JSONB_NEWDATA, LOG_TEXT_DESCR) {
  await Log.create({
    USU_INT_ID,
    LOG_VAR_TIPOALT,
    LOG_ENUM_TABLE_ALT,
    LOG_JSONB_ANTDATA,
    LOG_JSONB_NEWDATA,
    LOG_TEXT_DESCR,
    LOG_TMS_DTCAD: new Date(),
    USU_INT_COD_CAD: USU_INT_ID,
    LOG_TMS_DTALT: new Date(),
    USU_INT_COD_ALT: USU_INT_ID
  });
}

module.exports = { registrarLog };