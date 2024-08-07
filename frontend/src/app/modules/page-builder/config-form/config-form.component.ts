import { Component, OnDestroy } from '@angular/core';
import { ElementConfigModel, ElementInfoModel } from "../models/element.model";
import { PageBuilderService } from "../page-builder.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, Subscription } from "rxjs";

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html'
})
export class ConfigFormComponent implements OnDestroy {
  elementConfigForm!: FormGroup;
  elementDataSnapShot?: ElementInfoModel;
  private subscriptions: Subscription[] = [];

  constructor(private pageBuilderService: PageBuilderService,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.elementConfigForm = this.fb.group({
      width: [''],
      height: [''],
      position: ['relative'],
      zIndex: [0],
      top: [0],
      left: [0],
      right: [0],
      bottom: [0],
      color: [''],
      backgroundColor: [''],
      cssClasses: ['']
    });

    this.subscriptions.push(this.pageBuilderService.editingElement$.subscribe(el => {
      if(el)
        this.elementDataSnapShot = JSON.parse(JSON.stringify(el));
      else
        this.elementDataSnapShot = undefined

      this.elementConfigForm.reset();
      this.elementConfigForm.patchValue(el?.generalConfig || {})
    }))
    this.subscriptions.push(this.elementConfigForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.onSubmitChange(value)
    }))
  }

  onSubmitChange(value: ElementConfigModel): void {
    const config: ElementConfigModel = this.elementConfigForm.value;
    const element: ElementInfoModel = {
      ...(this.elementDataSnapShot as ElementInfoModel),
      generalConfig: {
        ...(this.elementDataSnapShot?.generalConfig || {}),
        ...config
      }
    }
    this.pageBuilderService.updateElement(element)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
