import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../../products/store";
import {Store} from "@ngrx/store";
import {Product} from "../../../products/model/product";
import {Subject} from "rxjs";
import {deleteProduct, loadProducts} from "../../../products/store/action/product.actions";
import {getAllProducts} from "../../../products/store/selector/product.selectors";
import {takeUntil} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductEditComponent} from "../../../products/components/product-edit/product-edit.component";

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.scss']
})
export class ProductListAdminComponent implements OnInit, OnDestroy {

  products: Product[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, private modalService: NgbModal) { }


  ngOnInit(): void {

    this.store.dispatch(loadProducts());
    this.store.select(getAllProducts).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Product[]) => {
      this.products = data.length > 0 ? data : [];
      // sort products by id
      this.products.sort((a,b) => a.id - b.id);
    } );
    // design render

    // action edit & delete

    // do users part : list user CRUD with role
  }

  edit(product: Product) {
    // open edit modal form
    const modalRef = this.modalService.open(ProductEditComponent);
    modalRef.componentInstance.product = product;
  }

  remove(productId: number) {
    if (window.confirm('Are you sure to delete this product ?')) {
      this.store.dispatch(deleteProduct({productId: productId.toString()}));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
