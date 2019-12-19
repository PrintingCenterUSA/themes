import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-catalog',
  templateUrl: './pagecatalog.component.html',
  styleUrls: ['./pagecatalog.component.css']
})
export class PagecatalogComponent implements OnInit {
  @Input('data') items: Array<Object>;
  @Input('key') key: string;
  constructor() { }

  ngOnInit() {
  }

}
