---
problemNumber: 97
title: Large non-Mersenne prime
description: Find the last ten digits of 28433 × 2^7830457 + 1.
difficulty: easy
date: 2024-04-12
technologies:
  - modular arithmetic
implementations:
  - language: cpp
    code: |
      #include <iostream>

      long long mod_pow(long long base, long long exp, long long mod) {
          long long result = 1;
          base %= mod;
          while (exp > 0) {
              if (exp % 2 == 1) {
                  // Use __int128 to avoid overflow in multiplication
                  __int128 temp = (__int128)result * base % mod;
                  result = temp;
              }
              __int128 temp_base = (__int128)base * base % mod;
              base = temp_base;
              exp /= 2;
          }
          return result;
      }

      long long large_non_mersenne_prime() {
          const long long MOD = 10000000000LL; // 10^10
          long long pow2 = mod_pow(2, 7830457, MOD);
          // Use __int128 for the final multiplication to avoid overflow
          __int128 temp = (__int128)28433LL * pow2 % MOD;
          long long result = (temp + 1) % MOD;
          return result;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/cpp/src/euler097.cpp
    performance: ~1ms
  - language: go
    code: |
      package main

      func modPow(base, exp, mod int64) int64 {
          result := int64(1)
          base %= mod
          for exp > 0 {
              if exp%2 == 1 {
                  result = (result * base) % mod
              }
              base = (base * base) % mod
              exp /= 2
          }
          return result
      }

      func largeNonMersennePrime() int64 {
          const MOD int64 = 10000000000
          pow2 := modPow(2, 7830457, MOD)
          result := (28433 * pow2 % MOD + 1) % MOD
          return result
      }
    githubLink: https://github.com/tvarley/euler/blob/master/go/src/euler097.go
    performance: ~1ms
  - language: java
    code: |
      public class Euler097 {
          static long modPow(long base, long exp, long mod) {
              long result = 1;
              base %= mod;
              while (exp > 0) {
                  if (exp % 2 == 1) {
                      result = (result * base) % mod;
                  }
                  base = (base * base) % mod;
                  exp /= 2;
              }
              return result;
          }

          static long largeNonMersennePrime() {
              final long MOD = 10000000000L;
              long pow2 = modPow(2, 7830457, MOD);
              long result = (28433L * pow2 % MOD + 1) % MOD;
              return result;
          }
      }
    githubLink: https://github.com/tvarley/euler/blob/master/java/src/euler097.java
    performance: ~1ms
  - language: javascript
    code: |
      function large_non_mersenne_prime() {
        const base = 28433n;
        const exp = 7830457n;
        const mod = 10000000000n;
        let result = 1n;
        let b = 2n; // base for exponentiation is 2
        let e = exp;
        while (e > 0n) {
          if (e % 2n === 1n) result = (result * b) % mod;
          b = (b * b) % mod;
          e /= 2n;
        }
        // Now result is 2^exp % mod
        result = (result * (base % mod)) % mod;
        result = (result + 1n) % mod;
        return Number(result);
      }
    githubLink: https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution097.js
    performance: ~1ms
  - language: python
    code: |
      def solve():
          base = 28433
          exp = 7830457
          mod = 10**10
          result = pow(2, exp, mod) * base % mod + 1
          return result
    githubLink: https://github.com/tvarley/euler/blob/master/python/src/euler097.py
    performance: ~1ms
  - language: rust
    code: |
      pub fn large_non_mersenne_prime() -> String {
          let base = 28433u64;
          let exp = 7830457u32;
          let modulus = 10_000_000_000u64;
          let pow = mod_pow(2, exp, modulus);
          let result = (base as u128 * pow as u128 % modulus as u128 + 1) % modulus as u128;
          format!("{:010}", result)
      }

      fn mod_pow(mut base: u64, mut exp: u32, modulus: u64) -> u64 {
          let mut result = 1u64;
          base %= modulus;
          while exp > 0 {
              if exp % 2 == 1 {
                  result = ((result as u128 * base as u128) % modulus as u128) as u64;
              }
              base = ((base as u128 * base as u128) % modulus as u128) as u64;
              exp /= 2;
          }
          result
      }
    githubLink: https://github.com/tvarley/euler/blob/master/rust/src/euler097.rs
    performance: ~1ms
tags:
  - modular arithmetic
  - exponentiation
  - big integers
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

The problem requires finding the last 10 digits of a very large number: 28433 × 2^7830457 + 1. Direct computation is impossible due to the number's size, so modular arithmetic is used.

### Algorithm Analysis

Compute 2^7830457 mod 10^10 using fast modular exponentiation (O(log exponent)), then multiply by 28433 mod 10^10, add 1, and take mod 10^10 again.

### Performance

Extremely fast (~1ms) across all languages due to logarithmic time complexity and small modulus.

### Key Insights

- Modular exponentiation prevents overflow by taking remainders at each step
- Big integer libraries needed in some languages for intermediate calculations
- Last digits computation reduces huge number to manageable arithmetic

### Educational Value

Demonstrates modular arithmetic applications, fast exponentiation algorithms, and handling very large numbers in programming.