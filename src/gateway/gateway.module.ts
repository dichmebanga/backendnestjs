import { Module } from "@nestjs/common";
import { gateway } from "./gateway";

@Module({
    providers:[gateway]
})
export class GatewayModule{}