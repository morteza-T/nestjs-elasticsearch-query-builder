import * as Joi from 'joi';
import configurationConfig from './configuration.config';

export const envConfig = {
  isGlobal: true,
  cache: true,
  load: [configurationConfig],
  validationSchema: Joi.object({
    PORT: Joi.number(),
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development')
      .required(),
    LOAN_BACK_OFFICE_MONGODB_URL: Joi.string().required(),
    DANTE_MONGODB_URL: Joi.string().required(),
    TEST_MONGODB_URL: Joi.string(),
    LOG_FILES_PATH: Joi.string().required(),
    LOG_FILES_NAME: Joi.string().required(),
    MONGO_SERVER_SELECTION_TIMEOUT: Joi.number(),
    MONGO_SOCKET_TIMEOUT: Joi.number(),
    LOG_LEVEL: Joi.string().required(),
    SENTRY_DSN: Joi.string().required(),
    CLIENT_ID: Joi.string(),
    CLIENT_SECRET: Joi.string(),
    SEP_BASE_URL: Joi.string().required(),
    SEP_PACKAGE_API: Joi.string(),

    MINIO_ENDPOINT: Joi.string().required(),
    MINIO_PORT: Joi.number().required(),
    MINIO_ACCESSKEY: Joi.string().required(),
    MINIO_SECRETKEY: Joi.string().required(),
    MINIO_BUCKET: Joi.string().required(),
    MINIO_USE_SSL: Joi.boolean().required(),
    ELASTICSEARCH_INDEX: Joi.string().required(),
    ELASTICSEARCH_REQUEST_CERT_STATUS: Joi.string().required(),
    LOAN_BASE_URL: Joi.string().required(),
    LOAN_DETAIL_INSTALLMENT_PATH: Joi.string().required(),
    MINIO_PUBLIC_BASE_URL: Joi.string().required(),
    THIRD_PARTY_CARD_LIST_API: Joi.string().required(),
    THIRD_PARTY_ACCOUNT_LIST_API: Joi.string().required(),
  }),
};
