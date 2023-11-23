import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @Get('/get-data')
  async getCrawlDataInWeb(@Query() query: any) {
    const { url } = query;
    return await this.crawlService.getDataCrawlWeb(url);
  }

  @Get('/get-html')
  async getHTMLInWeb(@Query() query: any) {
    const { url } = query;
    return await this.crawlService.getHTMLWeb(url);
  }
}
