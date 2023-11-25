import { Inject, Service } from "typedi";
import { PostsService } from "./posts.service";
import { NextFunction, Request, Response } from "express";
import { PostCreateDTO } from "./dtos/post-create.dto";
import { Pagination, ResponseData } from "../../helpers/response";
import { BodyResquest } from "../../base/base.request";
import { PostUpdateDTO } from "./dtos/post-update.dto";

@Service()
export class PostsController {
  constructor(@Inject() private postsService: PostsService) {}

  public getAllPostsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pagination: Pagination = Pagination.getPagination(req);
      const posts = await this.postsService.getAllPosts(pagination);
      res.json(new ResponseData(posts[0], null, posts[1]));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getPostsByStatusController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const status = isNaN(Number(req.query.status))
        ? -1
        : Number(req.query.status);
      console.log(
        "🚀 ~ file: posts.controller.ts:36 ~ PostsController ~ status:",
        status
      );
      const pagination: Pagination = Pagination.getPagination(req);
      const posts = await this.postsService.getPostByStatus(
        pagination,
        status,
        req.body._uId
      );
      res.json(new ResponseData(posts[0], null, posts[1]));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createNewPost = async (
    req: BodyResquest<PostCreateDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files as Express.Multer.File[];
      const postInfo = PostCreateDTO.fromRequest(req);
      const post = await this.postsService.createNewPost(postInfo, files);
      res.json(new ResponseData(post, null, null));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updatePost = async (
    req: BodyResquest<PostUpdateDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postInfo = PostUpdateDTO.fromRequest(req);
      const post = await this.postsService.updatePost(
        postInfo,
        req.params.postId
      );

      res.json(new ResponseData(post, null, null));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public sensorPost = async (
    req: BodyResquest<PostUpdateDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postInfo = PostUpdateDTO.fromRequest(req);
      const post = await this.postsService.sensorPost(
        postInfo,
        req.params.postId
      );

      res.json(new ResponseData(post, null, null));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public searchPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const search = req.query.search ? req.query.search.toString() : undefined;
      const pagination = Pagination.getPagination(req);
      const posts = await this.postsService.searchPost(search, pagination);

      res.json(new ResponseData(posts[0], null, posts[1]));
    } catch (error) {
      console.log(
        "🚀 ~ file: posts.controller.ts:117 ~ PostsController ~ error:",
        error
      );
      next(error);
    }
  };
}
