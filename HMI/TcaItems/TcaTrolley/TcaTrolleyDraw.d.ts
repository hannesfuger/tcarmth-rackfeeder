interface Coordinate {
    fX: number;
    fY: number;
}
interface TrolleyConfig {
    NumberOfCarriers: number;
    RackOrigin: Coordinate;
    CarrierDistance: number;
    RackDivision: number;
}
interface TrolleyData {
    CarriersCoordinate: Coordinate[];
    CarriersEnabled: boolean[];
    CarriersData: any[];
    CarrierConfig: CarrierConfig;
}
declare namespace TcHmi {
    namespace Functions {
        namespace TcHmiProject2 {
            function TcaTrolleyDraw(container: any, config: any, colors: any): void;
        }
    }
}
