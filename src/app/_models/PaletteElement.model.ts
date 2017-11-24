export class PaletteElementModel {
  id: string;
  uuid: string;
  label: string;
  imageURL: string;
  thumbnailURL: string;
  showedInPalette: boolean;
  paletteCategory: string;
  representedClass: string;
  representedClassLabel: string;
  parentElement: string;
  textLabelSizeX2: number;
  textLabelSizeY2: number;
  childElements: PaletteElementModel[];
  tempLabel;

}
