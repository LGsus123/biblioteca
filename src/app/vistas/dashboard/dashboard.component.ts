import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ListaLibrosI, LibroI } from '../../modelos/listalibros.interface';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


   image: any;
   title: any;
   price: any;

   pageSize: any = 10;
   page: any = 0;
   desde: number = 0;
   hasta: number = 9;
   cant: any;

   filterBook = '';
   listaLibros: ListaLibrosI = { error: '', total: '', page: '', books: [] };
   libros: LibroI[] = [];

   //libros: any[] = [];
   /*  libros: ListaLibrosI[] = [
      {
         title: "Visual Studio 2012 and .NET 4.5 Expert Development Cookbook",
         subtitle: "Over 40 recipes for successfully mixing the powerful capabilities of .NET 4.5 and Visual Studio 2012",
         isbn13: "9781849686709",
         price: "$35.99",
         image: "https://itbook.store/img/books/9781849686709.png",
         url: "https://itbook.store/books/9781849686709"
      },
      {
         title: "Microsoft .NET Framework 3.5 - ADO.NET Application Development",
         subtitle: "MCTS Self-Paced Training Kit (Exam 70-561)",
         isbn13: "9780735625631",
         price: "$4.23",
         image: "https://itbook.store/img/books/9780735625631.png",
         url: "https://itbook.store/books/9780735625631"
      },
      {
         title: "Pivotal Certified Professional Core Spring 5 Developer Exam, 2nd Edition",
         subtitle: "A Study Guide Using Spring Framework 5",
         isbn13: "9781484251355",
         price: "$39.99",
         image: "https://itbook.store/img/books/9781484251355.png",
         url: "https://itbook.store/books/9781484251355"
      },
      {
         title: "Joomla! 1.5: Beginner's Guide",
         subtitle: "Build and maintain impressive user-friendly websites the fast and easy way with Joomla! 1.5",
         isbn13: "9781847199904",
         price: "$26.99",
         image: "https://itbook.store/img/books/9781847199904.png",
         url: "https://itbook.store/books/9781847199904"
      },
      {
         title: "Microsoft Silverlight 5: Building Rich Enterprise Dashboards",
         subtitle: "Create, customize and design rich enterprise dashboards with Microsoft Silverlight 5",
         isbn13: "9781849682343",
         price: "$29.99",
         image: "https://itbook.store/img/books/9781849682343.png",
         url: "https://itbook.store/books/9781849682343"
      },
      {
         title: "Learning ASP.NET 3.5, 2nd Edition",
         subtitle: "Build Web Applications with ASP.NET 3.5, AJAX, LINQ, and More",
         isbn13: "9780596518455",
         price: "$14.40",
         image: "https://itbook.store/img/books/9780596518455.png",
         url: "https://itbook.store/books/9780596518455"
      },
      {
         title: "MCTS Self-Paced Training Kit (Exam 70-511)",
         subtitle: "Windows Application Development with Microsoft .NET Framework 4",
         isbn13: "9780735627420",
         price: "$12.00",
         image: "https://itbook.store/img/books/9780735627420.png",
         url: "https://itbook.store/books/9780735627420"
      },
      {
         title: "Best of Ruby Quiz",
         subtitle: "",
         isbn13: "9780976694076",
         price: "$4.16",
         image: "https://itbook.store/img/books/9780976694076.png",
         url: "https://itbook.store/books/9780976694076"
      },
      {
         title: "Linux All-in-One For Dummies, 5th Edition",
         subtitle: "",
         isbn13: "9781118844359",
         price: "$4.83",
         image: "https://itbook.store/img/books/9781118844359.png",
         url: "https://itbook.store/books/9781118844359"
      }
   ];  */

   displayedColumns: string[] = ['title', 'subtitle', 'isbn13', 'price', 'url'];
   dataSource = new MatTableDataSource<LibroI>([]);

   constructor(private api: ApiService,
      private router: Router,
      private modalService: NgbModal) {

   }


   ngOnInit(): void {
      this.getLista(this.page, 'angular');
      // this.dataSource  = new MatTableDataSource(this.libros);

   }

   applyFilter(event: any) {
      this.dataSource.filter = event.target.value?.trim().toLowerCase();
      this.getLista(this.page = 0, this.dataSource.filter);
   }

   verCaratula(title: any, image: any, price: any, caratulaModal: any) {
      this.image = image;
      this.title = title;
      this.price = price;
      this.modalService.open(caratulaModal);
      console.log(image, caratulaModal);
   }

   cambiarPagina(event: PageEvent) {
      this.pageSize = event.pageSize;
      this.page = event.pageIndex;
      this.desde = event.pageIndex * event.pageSize;
      this.hasta = this.desde + event.pageSize;
      this.getLista(this.page, 'angular');

      console.log(event, this.desde, this.hasta, event.pageSize);
   }

   getLista(pagina: any, texto: any) {
      this.api.getLibros(pagina, texto)
         .subscribe(data => {
            this.libros = data.books;
            this.listaLibros = data;
            this.dataSource.data = this.libros;
            this.cant = this.listaLibros.total;
            console.log('Lista Libros: ', this.dataSource);
         })
   }
}

