import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IConfigurationKey } from "../../entities/ConfigurationKeys/types/configuration-keys-types";
import { IDocument } from "../../entities/Documents/types/documents-types";

interface IConfigurationKeysAndDocuments {
  configurationKeys: IConfigurationKey[];
  termsOfUse: Partial<IDocument>;
}

const initialState: IConfigurationKeysAndDocuments = {
  configurationKeys: [],
  termsOfUse: {},
};

export const ConfigurationKeysAndDocumentsSlice = createSlice({
  name: "ConfigurationKeysAndDocuments",
  initialState,
  reducers: {
    setConfigurationKeys(state, action: PayloadAction<IConfigurationKey[]>) {
      state.configurationKeys = action.payload;
    },
    setTermsOfUse(state, action: PayloadAction<IDocument>) {
      state.termsOfUse = action.payload;
    },
  },
});

export const { setConfigurationKeys, setTermsOfUse } =
  ConfigurationKeysAndDocumentsSlice.actions;

export default ConfigurationKeysAndDocumentsSlice.reducer;
