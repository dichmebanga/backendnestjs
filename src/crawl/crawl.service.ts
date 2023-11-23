import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import puppeteer, { Browser } from 'puppeteer';
import { CrawlsEntity } from './crawl.entity';

@Injectable()
export class CrawlService {
  constructor(
    @InjectRepository(CrawlsEntity)
    private readonly crawlsRepository: Repository<CrawlsEntity>,
    @InjectDataSource() readonly connection: DataSource,
  ) {}

  async getDataCrawlWeb(url: any = 'https://books.toscrape.com/') {
    const browser: Browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(url);

    const dataCrawl = await page.evaluate((url) => {
      const selector = Array.from(document.querySelectorAll('.product_pod'));
      const data = selector.map((item: any) => {
        return {
          title: item.querySelector('h3 a')?.getAttribute('title'),
          price: item.querySelector('.price_color').innerText,
          img: url + item.querySelector('img')?.getAttribute('src'),
          rating: item.querySelector('.star_rating')?.classList[1],
          group: 'book',
        };
      });
      return data;
    }, url);
    await Promise.all(
      dataCrawl.map((item) => this.crawlsRepository.save(item)),
    );
    await browser.close();
    return true;
  }

  async getHTMLWeb(url: any) {
    const fs = require('fs');
    const browser = await puppeteer.launch({
      headless: 'new',
    });

    const page = await browser.newPage();
    await page.goto(url);

    // Lấy nội dung HTML của trang
    const htmlContent = await page.content();

    // Lưu nội dung HTML vào file
    const fileName = `${url.replace(/[^a-z0-9]/gi, '_')}.html`;
    const filePath = `./save/${fileName}`;

    fs.writeFileSync(filePath, htmlContent);

    console.log(`Đã lưu thành công vào file: ${filePath}`);

    await browser.close();
  }
}
