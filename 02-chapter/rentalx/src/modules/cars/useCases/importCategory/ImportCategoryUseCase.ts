// type File = {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   destination: string;
//   filename: string;
//   path: string;
//   size: number;
// };

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    console.log(file);
  }
}

export { ImportCategoryUseCase };
