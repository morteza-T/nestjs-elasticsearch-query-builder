export default class UserLogModel {
  'type': string;
  'user': {
    username: string;
    mobileNumbers: {
      rawValue: string;
      localizedDescription: string;
      e164: string;
      national: string;
    }[];
    customerId: string;
  };
  'device': {
    model: {
      cpuArchitecture: string;
      manufacturer: string;
      model: string;
      hardwareString: string;
      mainScreenSize: {
        size: {
          width: number;
          height: number;
        };
        ppp: number;
      };
    };
    appInfo: {
      version: {
        build: number;
        major: number;
        minor: number;
      };
    };
    status: string;
  };
  'tags': string[];
  'trackingInfo': {
    responseTime: Date;
    correlationId: string;
    duration: number;
    transactionIds: string[];
    requestTime: Date;
    requestId: string;
  };
  'timestamp': Date;
  'id': string;
  'ip': string;
  '@version': string;
  'path': string;
  'host': string;
}
