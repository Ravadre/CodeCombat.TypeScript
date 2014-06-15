/// <reference path="Common.d.ts" />

declare class Vector implements IPos {
    constructor();
    constructor(x: number, y: number);

    static add(a: Vector, b: Vector): Vector;
    copy(): Vector;
    distance(other: Vector): number;
    static divide(v: Vector, n: number): Vector;
    dot(other: Vector): number;
    equals(other: Vector): boolean;
    heading(): number;
    static limit(max: number): Vector;
    magnitude(): number;
    static multiply(v: Vector, n: number): Vector;
    static normalize(v: Vector): Vector;
    static subtract(a: Vector, b: Vector): Vector;

    x: number;
    y: number;
}