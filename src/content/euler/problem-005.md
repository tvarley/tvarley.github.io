---
problemNumber: 5
title: "Smallest Multiple"
description: "2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder. What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?"
difficulty: "easy"
date: 2015-01-02
technologies: ["cpp", "javascript", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <numeric>

      long long gcd(long long a, long long b) {
          while (b != 0) {
              long long t = b;
              b = a % b;
              a = t;
          }
          return a;
      }

      long long lcm(long long a, long long b) {
          return a / gcd(a, b) * b;
      }

      long long smallest_multiple(int n) {
          long long result = 1;
          for (int i = 2; i <= n; ++i) {
              result = lcm(result, i);
          }
          return result;
      }

      int main() {
          std::cout << smallest_multiple(20) << std::endl;
          return 0;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler005.cpp"
    performance: "O(n log n) using LCM calculation"
  - language: "javascript"
    code: |
      function gcd(a, b) {
          while (b !== 0) {
              let t = b;
              b = a % b;
              a = t;
          }
          return a;
      }

      function lcm(a, b) {
          return (a / gcd(a, b)) * b;
      }

      function smallestMultiple(n) {
          let result = 1;
          for (let i = 2; i <= n; i++) {
              result = lcm(result, i);
          }
          return result;
      }

      console.log(smallestMultiple(20));
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler005.js"
  - language: "ruby"
    code: |
      def gcd(a, b)
        while b != 0
          a, b = b, a % b
        end
        a
      end

      def lcm(a, b)
        (a / gcd(a, b)) * b
      end

      def smallest_multiple(n)
        result = 1
        (2..n).each do |i|
          result = lcm(result, i)
        end
        result
      end

      puts smallest_multiple(20)
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler005.rb"
  - language: "go"
    code: |
      package main

      import "fmt"

      func gcd(a, b int64) int64 {
          for b != 0 {
              a, b = b, a%b
          }
          return a
      }

      func lcm(a, b int64) int64 {
          return a / gcd(a, b) * b
      }

      func smallestMultiple(n int) int64 {
          result := int64(1)
          for i := int64(2); i <= int64(n); i++ {
              result = lcm(result, i)
          }
          return result
      }

      func main() {
          fmt.Println(smallestMultiple(20))
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler005.go"
  - language: "rust"
    code: |
      fn gcd(a: u64, b: u64) -> u64 {
          let mut a = a;
          let mut b = b;
          while b != 0 {
              let t = b;
              b = a % b;
              a = t;
          }
          a
      }

      fn lcm(a: u64, b: u64) -> u64 {
          a / gcd(a, b) * b
      }

      fn smallest_multiple(n: usize) -> u64 {
          let mut result: u64 = 1;
          for i in 2..=n {
              result = lcm(result, i as u64);
          }
          result
      }

      fn main() {
          println!("{}", smallest_multiple(20));
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler005.rs"
tags: ["euler", "lcm", "least-common-multiple"]
featured: true
showcase: true
---

## Mathematical Insight

This problem requires finding the Least Common Multiple (LCM) of all numbers from 1 to 20. The LCM can be calculated efficiently using the relationship LCM(a,b) = (a × b) / GCD(a,b), applied cumulatively. This approach avoids checking every number for divisibility.