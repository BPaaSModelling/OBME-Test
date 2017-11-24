export class EndpointSettings {

  private static ENDPOINT                   : string = 'http://localhost:8080';
  private static PALETTEELEMENTS            : string = '/ModEnv/getPaletteElements';
  private static PALETTECATEGORIES          : string = '/ModEnv/getPaletteCategories';

  public static getPaletteElementsEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.PALETTEELEMENTS;
  }

  public static getPaletteCategoriesEndpoint(): string {
    return EndpointSettings.ENDPOINT + EndpointSettings.PALETTECATEGORIES;
  }
}
