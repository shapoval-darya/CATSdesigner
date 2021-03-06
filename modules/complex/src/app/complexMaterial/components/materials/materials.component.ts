import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsPopoverComponent } from './materials-popover/materials-popover.component';
import { MenuComponent } from './menu/menu.component';
import { ComplexCascade } from '../../../models/ComplexCascade';
import { ComplexService } from '../../../service/complex.service';


@Component({
  selector: 'app-material-tree',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.less'],
})
export class MaterialComponent implements OnInit {
  @Input() complexId: string  
  treeControl = new NestedTreeControl<ComplexCascade>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ComplexCascade>();

  constructor(public dialog: MatDialog,
    private complexService: ComplexService) {
    
  }

  hasChild = (_: number, node: ComplexCascade) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.complexService.getConceptCascade(this.complexId).subscribe(res => {
      this.dataSource.data = res.children;
      this.treeControl.dataNodes = res.children;
      this.treeControl.expandAll();
    });  
  }
  
  openPDF(path: string): void {
    debugger;
    const dialogRef = this.dialog.open(MaterialsPopoverComponent, {
      width: '800px',
      data: { name: 'name', url: path }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }
}
