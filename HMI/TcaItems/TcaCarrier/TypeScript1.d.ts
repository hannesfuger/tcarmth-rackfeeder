declare enum TcaCarrierLayout {
    Layout1 = 0,
    Layout2 = 1,
    Layout3 = 2,
    Layout4 = 3,
    Layout5 = 4
}
interface Coordinate {
    fX: number;
    fY: number;
}
interface CarrierConfig {
    Layout: TcaCarrierLayout;
    PositionsInRow: number;
    PositionsInColumn: number;
    ColumnDistance: number;
    RowDistance: number;
    CoordinateFirstWorkpiece: Coordinate;
}
interface CarrierData {
    WorkpiecesCoordinate: Coordinate[];
    WorkpiecesEnabled: boolean[];
    Error: boolean;
}
