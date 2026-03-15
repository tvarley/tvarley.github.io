---
problemNumber: 48
title: "Self Powers"
description: |
  The series, $1^1 + 2^2 + 3^3 + \cdots + 10^{10} = 10405071317$.
  
  Find the last ten digits of the series, $1^1 + 2^2 + 3^3 + \cdots + 1000^{1000}$.
difficulty: "hard"
date: 2026-03-15
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=48
      
      // The series, 1¹ + 2² + 3³ + … + 10¹⁰ = 10405071317.
      
      // Find the last ten digits of the series, 1¹ + 2² + 3³ + … + 1000¹⁰⁰⁰.
      
      // Answer: 9110846700
      
      // Authored by: Tim Varley 💘
      
      #include <iostream>
      #include <string>
      
      std::string self_powers() {
          const long long MOD = 10000000000LL; // 10^10
          long long sum = 0;
          for (int i = 1; i <= 1000; ++i) {
              long long power = 1;
              for (int j = 0; j < i; ++j) {
                  power = (power * i) % MOD;
              }
              sum = (sum + power) % MOD;
          }
          std::string result = std::to_string(sum);
          while (result.size() < 10) result = "0" + result;
          return result;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << self_powers() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler048.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.math.BigInteger;
      
      public class Solution048 implements Solution {
        public String solve() {
          BigInteger sum = BigInteger.ZERO;
          for (int i = 1; i <= 1000; i++) {
            BigInteger pow = BigInteger.valueOf(i).pow(i);
            sum = sum.add(pow);
          }
          String s = sum.toString();
          return s.substring(s.length() - 10);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution048.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          const MOD = 10000000000n;
          let sum = 0n;
          for (let i = 1n; i <= 1000n; i++) {
            let pow = 1n;
            for (let j = 0n; j < i; j++) {
              pow = (pow * i) % MOD;
            }
            sum = (sum + pow) % MOD;
          }
          return Number(sum);
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution048.js"
  - language: "python"
    code: |
      def solve():
          """
          Self Powers
          The series, 1¹ + 2² + 3³ + … + 10¹⁰ = 10405071317.
      
          Find the last ten digits of the series, 1¹ + 2² + 3³ + … + 1000¹⁰⁰⁰.
          https://projecteuler.net/problem=48
          """
          total = 0
          mod = 10**10
          for i in range(1, 1001):
              total = (total + pow(i, i, mod)) % mod
          return total
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler048.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "math/big"
      
      func main() {
      	mod := big.NewInt(10000000000)
      	sum := big.NewInt(0)
      	for i := 1; i <= 1000; i++ {
      		pow := big.NewInt(int64(i))
      		pow.Exp(pow, big.NewInt(int64(i)), nil)
      		sum.Add(sum, pow)
      		sum.Mod(sum, mod)
      	}
      	fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler048.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=48
      //
      // The series, 1¹ + 2² + 3³ + … + 10¹⁰ = 10405071317.
      // Find the last ten digits of the series, 1¹ + 2² + 3³ + … + 1000¹⁰⁰⁰.
      //
      // Answer: 9110846700
      
      use num_bigint::BigUint;
      
      pub fn self_powers() -> String {
          let mut sum = BigUint::from(0u32);
          let modulus = BigUint::from(10u32).pow(10);
          for n in 1..=1000 {
              let mut power = BigUint::from(n as u32);
              power = power.modpow(&BigUint::from(n as u32), &modulus);
              sum = (sum + power) % &modulus;
          }
          format!("{:010}", sum)
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_048() {
              assert_eq!(self_powers(), "9110846700");
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler048.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

Self powers are numbers raised to their own power: n^n.

The series is S = 1^1 + 2^2 + 3^3 + ... + 1000^1000.

We need the last ten digits of S, i.e., S mod 10^10.

### Algorithm Analysis

Since we only need the last ten digits, we can compute each term modulo 10^10, then sum modulo 10^10.

For large exponents, we use modular exponentiation to compute n^n mod 10^10 efficiently.

### Performance Analysis

- **Time Complexity**: O(1000 × log(10^10)) ≈ O(10^6)
- **Space Complexity**: O(1)
- **Execution Time**: Very fast (<1 second)
- **Scalability**: Linear in the upper limit

### Key Insights

- Modular arithmetic allows handling arbitrarily large numbers

- The last ten digits depend only on the computation modulo 10^10

- Efficient exponentiation prevents overflow

- The sum grows very large, but we only need the residue

### Educational Value

This problem teaches:

- Modular arithmetic for large number computations

- Efficient exponentiation algorithms

- The concept of residues and last digits

- Handling computational limits through mathematical techniques
