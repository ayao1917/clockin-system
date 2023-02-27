// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

declare type Writeable<T> = { -readonly [P in keyof T]: T[P] };

declare type Saga<T> = Generator<SagaEffect, T, any>;
