#!/bin/sh

# 清空编译产物
rm -rf dist types

# 编译 ts
pnpm build:esm
pnpm build:cjs