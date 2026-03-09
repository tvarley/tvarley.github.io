---
problemNumber: 3
title: "Largest Prime Factor"
description: "The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143?"
difficulty: "medium"
date: 2015-01-01
technologies: ["cpp", "java", "javascript", "php", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <cmath>

      bool is_prime(long long n) {
          if (n <= 1) return false;
          if (n <= 3) return true;
          if (n % 2 == 0 || n % 3 == 0) return false;
          for (long long i = 5; i * i <= n; i += 6) {
              if (n % i == 0 || n % (i + 2) == 0) return false;
          }
          return true;
      }

      long long largest_prime_factor(long long n) {
          long long max_prime = -1;
          while (n % 2 == 0) {
              max_prime = 2;
              n /= 2;
          }
          for (long long i = 3; i * i <= n; i += 2) {
              while (n % i == 0) {
                  max_prime = i;
                  n /= i;
              }
          }
          if (n > 2) max_prime = n;
          return max_prime;
      }

      int main() {
          std::cout << largest_prime_factor(600851475143LL) << std::endl;
          return 0;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler003.cpp"
    performance: "O(sqrt(n)) time complexity with optimized trial division"
  - language: "java"
    code: |
      public class Euler003 {
          public static boolean isPrime(long n) {
              if (n <= 1) return false;
              if (n <= 3) return true;
              if (n % 2 == 0 || n % 3 == 0) return false;
              for (long i = 5; i * i <= n; i += 6) {
                  if (n % i == 0 || n % (i + 2) == 0) return false;
              }
              return true;
          }

          public static long largestPrimeFactor(long n) {
              long maxPrime = -1;
              while (n % 2 == 0) {
                  maxPrime = 2;
                  n /= 2;
              }
              for (long i = 3; i * i <= n; i += 2) {
                  while (n % i == 0) {
                      maxPrime = i;
                      n /= i;
                  }
              }
              if (n > 2) maxPrime = n;
              return maxPrime;
          }

          public static void main(String[] args) {
              System.out.println(largestPrimeFactor(600851475143L));
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler003.java"
  - language: "javascript"
    code: |
      function isPrime(n) {
          if (n <= 1) return false;
          if (n <= 3) return true;
          if (n % 2 === 0 || n % 3 === 0) return false;
          for (let i = 5; i * i <= n; i += 6) {
              if (n % i === 0 || n % (i + 2) === 0) return false;
          }
          return true;
      }

      function largestPrimeFactor(n) {
          let maxPrime = -1;
          while (n % 2 === 0) {
              maxPrime = 2;
              n /= 2;
          }
          for (let i = 3; i * i <= n; i += 2) {
              while (n % i === 0) {
                  maxPrime = i;
                  n /= i;
              }
          }
          if (n > 2) maxPrime = n;
          return maxPrime;
      }

      console.log(largestPrimeFactor(600851475143));
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler003.js"
  - language: "php"
    code: |
      <?php
      function isPrime($n) {
          if ($n <= 1) return false;
          if ($n <= 3) return true;
          if ($n % 2 == 0 || $n % 3 == 0) return false;
          for ($i = 5; $i * $i <= $n; $i += 6) {
              if ($n % $i == 0 || $n % ($i + 2) == 0) return false;
          }
          return true;
      }

      function largestPrimeFactor($n) {
          $maxPrime = -1;
          while ($n % 2 == 0) {
              $maxPrime = 2;
              $n /= 2;
          }
          for ($i = 3; $i * $i <= $n; $i += 2) {
              while ($n % $i == 0) {
                  $maxPrime = $i;
                  $n /= $i;
              }
          }
          if ($n > 2) $maxPrime = $n;
          return $maxPrime;
      }

      echo largestPrimeFactor(600851475143);
      ?>
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/php/src/euler003.php"
  - language: "ruby"
    code: |
      def is_prime?(n)
        return false if n <= 1
        return true if n <= 3
        return false if n % 2 == 0 || n % 3 == 0
        i = 5
        while i * i <= n
          return false if n % i == 0 || n % (i + 2) == 0
          i += 6
        end
        true
      end

      def largest_prime_factor(n)
        max_prime = -1
        while n % 2 == 0
          max_prime = 2
          n /= 2
        end
        i = 3
        while i * i <= n
          while n % i == 0
            max_prime = i
            n /= i
          end
          i += 2
        end
        max_prime = n if n > 2
        max_prime
      end

      puts largest_prime_factor(600851475143)
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler003.rb"
  - language: "go"
    code: |
      package main

      import "fmt"

      func isPrime(n int64) bool {
          if n <= 1 {
              return false
          }
          if n <= 3 {
              return true
          }
          if n%2 == 0 || n%3 == 0 {
              return false
          }
          for i := int64(5); i*i <= n; i += 6 {
              if n%i == 0 || n%(i+2) == 0 {
                  return false
              }
          }
          return true
      }

      func largestPrimeFactor(n int64) int64 {
          var maxPrime int64 = -1
          for n%2 == 0 {
              maxPrime = 2
              n /= 2
          }
          for i := int64(3); i*i <= n; i += 2 {
              for n%i == 0 {
                  maxPrime = i
                  n /= i
              }
          }
          if n > 2 {
              maxPrime = n
          }
          return maxPrime
      }

      func main() {
          fmt.Println(largestPrimeFactor(600851475143))
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler003.go"
  - language: "rust"
    code: |
      fn is_prime(n: u64) -> bool {
          if n <= 1 {
              return false;
          }
          if n <= 3 {
              return true;
          }
          if n % 2 == 0 || n % 3 == 0 {
              return false;
          }
          let mut i = 5;
          while (i as u64) * (i as u64) <= n {
              if n % (i as u64) == 0 || n % ((i + 2) as u64) == 0 {
                  return false;
              }
              i += 6;
          }
          true
      }

      fn largest_prime_factor(mut n: u64) -> u64 {
          let mut max_prime = 1;
          while n % 2 == 0 {
              max_prime = 2;
              n /= 2;
          }
          let mut i = 3;
          while (i as u64) * (i as u64) <= n {
              while n % (i as u64) == 0 {
                  max_prime = i as u64;
                  n /= i as u64;
              }
              i += 2;
          }
          if n > 2 {
              max_prime = n;
          }
          max_prime
      }

      fn main() {
          println!("{}", largest_prime_factor(600851475143));
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler003.rs"
tags: ["euler", "prime-factors", "factorization"]
featured: true
showcase: true
---

## Algorithm Notes

This problem requires finding the largest prime factor of a very large number. The solution uses an optimized trial division approach, checking divisibility by 2 first, then odd numbers up to the square root of the number. The algorithm efficiently handles large numbers by dividing out factors as they're found.