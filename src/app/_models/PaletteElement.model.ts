export class PaletteElementModel {
  id: string;
  uuid: string;
  label: string;
  paletteCategory: string;
  parentElement: string;
  hiddenFromPalette: boolean;
  childElements: PaletteElementModel[];
  representedLanguageClass: string;
  shape: string;
  backgroundColor: string;
  height: string;
  width: string;
  labelPosition: string;
  iconURL: string;
  iconPosition: string;
  usesImage: string;
  imageURL: string;
  thumbnailURL: string;
  borderColor: string;
  borderThickness: string;
  borderType: string;

  tempLabel;

}
