import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPost(createPostDto: CreatePostDto): Promise<any> {
    const postItem: any = { ...createPostDto };
    const post = await this.prisma.post.create({
      data: {
        ...postItem,
      },
    });
    return post;
  }

  getPost() {
    return this.prisma.post.findMany();
  }

  getPostById(id: number): Promise<any> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  //id以外を指定してPostを取得
  // getPostOne(content: string): Promise<any> {
  //   return this.prisma.post.findMany({
  //     where: {
  //       title: {
  //         contains: content,
  //       },
  //     },
  //   });
  // }

  getCategoryPost(categoryId: number): Promise<any> {
    return this.prisma.post.findMany({
      where: {
        categoryId,
      },
    });
  }

  async updatePost(id: number, createPostDto: CreatePostDto): Promise<any> {
    const updateItem: any = { ...createPostDto };
    const update = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...updateItem,
      },
    });
    return update;
  }

  deletePost(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
