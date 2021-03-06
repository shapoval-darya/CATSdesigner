import { Injectable } from '@angular/core';
import { ComplexGrid } from '../models/ComplexGrid';
import { ComplexTree, TreeNode } from '../models/ComplexTree';
import { ComplexCascade } from '../models/ComplexCascade';

@Injectable({
  providedIn: 'root'
})

export class ConverterService {
  constructor() {
  }
  private conceptConverter(concept: any) {
    const complexGrid = new ComplexGrid();
    complexGrid.id = concept.Id;
    complexGrid.name = concept.ShortName;
    complexGrid.fullname = concept.Name;

    return complexGrid;
  }

  public complexGridConverter(concepts: any[]) {
    return concepts.map(con => this.conceptConverter(con));
  }

  public mapConverter(concept: any) {
    var tree = new ComplexTree([]);
    tree.result.push(new TreeNode(concept.Id, concept.Name, null, concept.FilePath));
    this.childMapConverter(concept.children, tree, concept.Id);

    return tree;
  }

  private childMapConverter(childConcepts: any[], tree: ComplexTree, parentId: number) {
    if (!childConcepts || childConcepts.length === 0) {
      return;
    }
    for (let concept of childConcepts) {
      tree.result.push(new TreeNode(concept.Id, concept.Name, parentId, concept.FilePath));
      this.childMapConverter(concept.children, tree, concept.Id);
    }
  }
}
