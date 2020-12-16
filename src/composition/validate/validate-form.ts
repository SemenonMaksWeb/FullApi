import { ValidateInput } from '@/composition/validate/validate-input.ts';
export function ValidateForm(FormData: any) {
  const AllCheckChient = (): boolean => {
    let fullValidClient = true;
    for (const keyNameInput in FormData) {
      ValidateInput(FormData, keyNameInput).OnSwitch();
      for (const key in FormData[keyNameInput].error) {
        if (
          FormData[keyNameInput].error[key].active === true &&
          FormData[keyNameInput].error[key].type !== 'server'
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
      for (const keyNameInput in FormData) {
        for (const keyNamePag in FormData[keyNameInput].regulationsServer) {
          if (FormData[keyNameInput].regulationsServer[keyNamePag]() === true) {
            FormData[keyNameInput].error[keyNamePag].active = true;
            checkServer = false;
          } else {
            FormData[keyNameInput].error[keyNamePag].active = false;
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
