import { ValidateInput } from '@/composition/_plagins/validate/validate-input.js';
import { FormData } from '@/composition/_plagins/validate/validate-type.js';
export function ValidateForm(FormDataAll: FormData) {
  const AllCheckChient = (): boolean => {
    let fullValidClient = true;
    for (const keyNameInput in FormDataAll) {
      ValidateInput(FormDataAll, keyNameInput).OnSwitch();
      for (const key in FormDataAll[keyNameInput].error) {
        if (
          FormDataAll[keyNameInput].error[key].active === true &&
          FormDataAll[keyNameInput].error[key].type !== 'server'
        ) {
          fullValidClient = false;
          break;
        }
      }
    }
    return fullValidClient;
  };
  const AllCheckServer = (checkClient: boolean): boolean => {
    let checkServer = true;
    if (checkClient === true) {
      for (const keyNameInput in FormDataAll) {
        for (const keyNamePag in FormDataAll[keyNameInput].regulationsServer) {
          if (
            FormDataAll[keyNameInput].regulationsServer[keyNamePag]() === true
          ) {
            FormDataAll[keyNameInput].error[keyNamePag].active = true;
            checkServer = false;
          } else {
            FormDataAll[keyNameInput].error[keyNamePag].active = false;
          }
        }
      }
      return checkServer;
    } else return false;
  };
  const AllCheck = (): boolean => {
    const checkClient = AllCheckChient();
    return AllCheckServer(checkClient);
  };
  return { AllCheck };
}
