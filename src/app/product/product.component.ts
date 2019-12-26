import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from "../_models/product";
import { ProductService } from "../_services/product.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Output() cancelProduct = new EventEmitter();
  product: Product;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.fb.group({
      productname: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.product = Object.assign({}, this.productForm.value);
      this.productService.addProduct(this.product).subscribe(
        () => {
          this.alertify.success('Creation successful');
        },
        error => {
          this.alertify.error(error);
        }
      );
    }
  }

  cancel() {
    this.cancelProduct.emit(false);
  }
}
