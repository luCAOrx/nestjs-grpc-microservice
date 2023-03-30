// import {
//   sendUnaryData,
//   ServerUnaryCall,
//   UntypedHandleCall,
// } from '@grpc/grpc-js';
// import { CloneProductHandler } from '@infra/handlers/CloneProductHandler';
// import { CreateProductHandler } from '@infra/handlers/CreateProductHandler';
// import { DeleteProductHandler } from '@infra/handlers/DeleteProductHandler';
// import { GetProductInformationHandler } from '@infra/handlers/GetProductInformationHandler';
// import { ListAllProductsHandler } from '@infra/handlers/ListAllProductsHandler';
// import { UpdateProductHandler } from '@infra/handlers/UpdateProductHandler';

// import { IProductServiceServer } from '../proto/product_grpc_pb';

// import {
//   Nothing,
//   CloneProductRequest,
//   GetProductInformationRequest,
//   ProductListResponse,
//   ListAllProductsRequest,
//   UpdateProductRequest,
//   DeleteProductRequest,
//   ProductResponse,
//   CreateProductRequest,
//   Product,
// } from '../proto/product_pb';

// export class ProductServer implements IProductServiceServer {
//   [name: string]: UntypedHandleCall;

//   async createProduct(
//     call: ServerUnaryCall<CreateProductRequest, ProductResponse>,
//     callback: sendUnaryData<ProductResponse>,
//   ) {
//     const handler = new CreateProductHandler();

//     const {
//       thumbnail,
//       name,
//       ingredients,
//       price,
//       volume,
//       availability,
//       others,
//     } = call.request.toObject();

//     await handler
//       .handle({
//         thumbnail,
//         name,
//         ingredients,
//         price,
//         volume,
//         availability,
//         others,
//       })
//       .then(() => {
//         const response = new ProductResponse();
//         response.setProduct(
//           new Product()
//             .setThumbnail(thumbnail)
//             .setName(name)
//             .setIngredients(ingredients)
//             .setPrice(price)
//             .setVolume(volume)
//             .setAvailability(availability)
//             .setOthers(others),
//         );

//         return callback(null, response);
//       })
//       .catch((error) => {
//         return callback(error, null);
//       });
//   }

//   async cloneProduct(
//     call: ServerUnaryCall<CloneProductRequest, ProductResponse>,
//     callback: sendUnaryData<ProductResponse>,
//   ) {
//     try {
//       const { id } = call.request.toObject();

//       const handler = new CloneProductHandler();

//       await handler.handle({
//         productId: id,
//       });

//       return callback(null, new ProductResponse());
//     } catch (error: any) {
//       return callback(error, null);
//     }
//   }

//   async getProductInformation(
//     call: ServerUnaryCall<GetProductInformationRequest, ProductListResponse>,
//     callback: sendUnaryData<ProductListResponse>,
//   ) {
//     try {
//       const { query, page } = call.request.toObject();

//       const handler = new GetProductInformationHandler();

//       await handler.handle({
//         page: Number(page),
//         query,
//       });

//       return callback(null, new ProductListResponse());
//     } catch (error: any) {
//       return callback(error, null);
//     }
//   }

//   async listAllProducts(
//     call: ServerUnaryCall<ListAllProductsRequest, ProductListResponse>,
//     callback: sendUnaryData<ProductListResponse>,
//   ) {
//     try {
//       const { page } = call.request.toObject();

//       const handler = new ListAllProductsHandler();

//       await handler.handle({
//         page: Number(page),
//       });

//       return callback(null, new ProductListResponse());
//     } catch (error: any) {
//       return callback(error, null);
//     }
//   }

//   async updateProduct(
//     call: ServerUnaryCall<UpdateProductRequest, ProductResponse>,
//     callback: sendUnaryData<ProductResponse>,
//   ) {
//     try {
//       const {
//         id,
//         availability,
//         ingredients,
//         name,
//         others,
//         price,
//         thumbnail,
//         volume,
//       } = call.request.toObject();
//       const handler = new UpdateProductHandler();

//       await handler.handle({
//         data: {
//           availability,
//           ingredients,
//           name,
//           others,
//           price,
//           thumbnail,
//           volume,
//         },
//         productId: id,
//       });

//       return callback(null, new ProductResponse());
//     } catch (error: any) {
//       return callback(error, null);
//     }
//   }

//   async deleteProduct(
//     call: ServerUnaryCall<DeleteProductRequest, Nothing>,
//     callback: sendUnaryData<Nothing>,
//   ) {
//     try {
//       const { id } = call.request.toObject();

//       const handler = new DeleteProductHandler();

//       await handler.handle({
//         productId: id,
//       });

//       return callback(null, new Nothing());
//     } catch (error: any) {
//       return callback(error, null);
//     }
//   }
// }
