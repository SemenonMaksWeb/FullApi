import { ValidateInput } from '@/composition/_plagins/validate/validate-input.ts';
// import { FormData } from '@/composition/_plagins/validate/validate-type.js';
export const ValidateForm = (FormDataAll: any) => {
  const AllCheckChient = (): boolean => {
    let fullValidClient = true;
    for (const keyNameInput in FormDataAll.value) {
      ValidateInput(FormDataAll.value, keyNameInput).OnSwitch();
      for (const key in FormDataAll.value[keyNameInput].error) {
        if (
          FormDataAll.value[keyNameInput].error[key].active === true &&
          FormDataAll.value[keyNameInput].error[key].type !== 'server'
        ) {
          fullValidClient = false;
          break;
        }
      }
    }
    return fullValidClient;
  };
  const AllCheckServer = async (checkClient: boolean): Promise<boolean> => {
    let checkServer = true;
    if (checkClient === true) {
      for (const keyNameInput in FormDataAll.value) {
        for (const keyNamePag in FormDataAll.value[keyNameInput]
          .regulationsServer) {
          if (
            FormDataAll.value[keyNameInput].regulationsServer[keyNamePag](
              FormDataAll
            ) === true
          ) {
            FormDataAll.value[keyNameInput].error[keyNamePag].active = true;
            checkServer = false;
          } else {
            FormDataAll.value[keyNameInput].error[keyNamePag].active = false;
          }
        }
      }
      return checkServer;
    } else return false;
  };
  const AllCheck = async (): Promise<boolean> => {
    const checkClient = AllCheckChient();
    return await AllCheckServer(checkClient);
  };
  return { AllCheck };
};
