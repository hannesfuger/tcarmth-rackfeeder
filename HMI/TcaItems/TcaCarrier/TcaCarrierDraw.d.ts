declare enum Layout {
    undefined = 0,
    Layout1 = 1,
    Layout2 = 2,
    Layout3 = 3,
    Layout4 = 4,
    Layout5 = 5
}
interface Coordinate {
    fX: number;
    fY: number;
}
interface CarrierConfig {
    Layout: Layout;
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
declare namespace TcHmi {
    namespace Functions {
        namespace TcHmiProject2 {
            function TcaCarrierDraw(container: any, config: any, color: any): void;
        }
    }
}
