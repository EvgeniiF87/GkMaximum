export interface IDocument {
  id: number;
  data: string;
  key: string;
}

interface IResponseGetAllDocumentsData {
  documents: IDocument[];
  limit: number;
  page: number;
  totalCount: number;
  currentCount: number;
}

export interface IResponseGetAllDocuments {
  data: IResponseGetAllDocumentsData;
  message: string | null;
  status: string;
}
