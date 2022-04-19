import { FireBaseAuth } from "./firebase-auth";
import { FireBaseConstant } from "./firebase-constant";
import { FirebaseRealTimeCursor } from "./firebaserealtime-cursor";
import { FirebaseDataBaseApi } from "./FirebaseDatabaseApi";
import { FirebaseFile } from "./FirebaseFile.service";
import { FirebaseFireStoreApi } from "./FirebaseFirestoreApi";
import { FirebaseError } from "./firebast-error";
// FirebaseDataBaseApi as FireBaseApi

export { 
    FireBaseConstant as FireBaseErrorType,
    FirebaseDataBaseApi as FirebastRealtimeDataBaseApi,
    FirebaseFireStoreApi as FirebaseDataBaseApi,
    FirebaseError,
    FireBaseAuth,
    FirebaseFile,
    FirebaseRealTimeCursor
}