import { ActionStatus } from "../../actionstatus";
import { FireBaseConstant } from "./firebase-constant";

export class FirebaseError
{
    static handleApiError(result: ActionStatus<any>) {
        console.error("Error",result)
        switch (result.apiCode) {
          case FireBaseConstant.AUTH_USER_NOT_FOUND:
          case FireBaseConstant.AUTH_WRONG_PASSWORD:
          case FireBaseConstant.AUTH_ACCOUNT_EXIST_WITH_DIFFERENT_CREDENTIAL:
            result.message = 'Email ou mot de passe incorrect';
            break;
          case FireBaseConstant.AUTH_WEAK_PASSWORD:
            result.message = 'Le mot de passe doit avoir au moins 6 caractères';
            break;
          case FireBaseConstant.AUTH_EMAIL_ALREADY_USE:
            result.message = 'cet email est déjà utilisé';
            break;
    
          case FireBaseConstant.AUTH_REQUIRE_RECENT_LOGIN:
            result.message = "Vous devez vous connecter pour accéder à l'application. Si vous vous êtes récemment connecté, vous devez le faire à nouveau.";
            break;
          case FireBaseConstant.AUTH_CREDENTIAL_ALREADY_IN_USE:
            result.message = 'Vous êtes déjà connecté';
            break;
          case FireBaseConstant.AUTH_TOO_MANY_REQUEST:
            result.message = result.description;
            break;
          case FireBaseConstant.DESACTIVED_ACCOUNT:
            result.message = "Compte désactivé. Veuillez contacter l'administrateur pour une réactivation";
            break;
          case FireBaseConstant.NET_NETWORK_FAIL:
            result.message = 'Hors ligne. Veuillez vérifier votre connectivité réseau';
            break;
          case ActionStatus.INVALID_ARGUMENT_ERROR:
            break;
          default:
            // this.eventService.newBugEvent.next(bug);
            //Bugsnag.notify(bug.error)
            // console.log("Result error ",result)
            // result.message = 'Unknow error. Please contact administrator';
            break;
        }
      }
}