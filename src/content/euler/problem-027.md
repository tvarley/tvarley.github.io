---
problemNumber: 27
title: "Quadratic Primes"
description: |
  Euler discovered the remarkable quadratic formula:

  $n^2 + n + 41$

  It turns out that the formula will produce $40$ primes for the consecutive integer values $0 \le n \le 39$. However, when $n = 40, 40^2 + 40 + 41 = 40(40 + 1) + 41$ is divisible by $41$, and certainly when $n = 41, 41^2 + 41 + 41$ is clearly divisible by $41$.

  The incredible formula $n^2 - 79n + 1601$ was discovered, which produces $80$ primes for the consecutive values $0 \le n \le 79$. The product of the coefficients, $-79$ and $1601$, is $-126479$.

  Considering quadratics of the form:

  $n^2 + an + b$, where $|a| < 1000$ and $|b| \le 1000$

  where $|n|$ is the modulus/absolute value of $n$  
  e.g. $|11| = 11$ and $|-4| = 4$

  Find the product of the coefficients, $a$ and $b$, for the quadratic expression that produces the maximum number of primes for consecutive values of $n$, starting with $n = 0$.
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=27
      
      // Euler discovered the remarkable quadratic formula:
      // n² + n + 41
      //
      // It turns out that the formula will produce 40 primes for the consecutive values n = 0 to 39.
      // However, when n = 40, 402 + 40 + 41 = 40(40 + 1) + 41 = 41² = 1681 is divisible by 41,
      // and certainly when n = 41, 41² + 41 + 41 is clearly divisible by 41.
      //
      // The incredible formula n² − 79n + 1601 was discovered, which produces 80 primes for the consecutive values n = 0 to 79.
      // The product of the coefficients, −79 and 1601, is −126479.
      //
      // Considering quadratics of the form:
      // n² + a*n + b, where |a| < 1000 and |b| < 1000
      //
      // where |n| is the modulus/absolute value of n
      // e.g. |11| = 11 and |−4| = 4
      //
      // Find the product of the coefficients, a and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n = 0.
      //
      // Answer: -59231
      
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
      
      int quadratic_primes_max_product(int max_a, int max_b) {
          int max_streak = 0;
          int best_product = 0;
          for (int a = -max_a + 1; a < max_a; ++a) {
              for (int b = 2; b <= max_b; ++b) {  // b must be prime
                  if (!is_prime(b)) continue;
                  int n = 0;
                  while (true) {
                      long long val = (long long)n * n + a * n + b;
                      if (!is_prime(val)) break;
                      ++n;
                  }
                  if (n > max_streak) {
                      max_streak = n;
                      best_product = a * b;
                  }
              }
          }
          return best_product;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << quadratic_primes_max_product(1000, 1000) << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler027.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution027 implements Solution {
        public String solve() {
          int maxCount = 0;
          int result = 0;
      
          for (int a = -999; a < 1000; a++) {
            for (int b = -1000; b <= 1000; b++) {
              int count = consecutivePrimes(a, b);
              if (count > maxCount) {
                maxCount = count;
                result = a * b;
              }
            }
          }
      
          return Integer.toString(result);
        }
      
        private int consecutivePrimes(int a, int b) {
          int n = 0;
          while (isPrime(n * n + a * n + b)) {
            n++;
          }
          return n;
        }
      
        private boolean isPrime(int n) {
          if (n < 2) return false;
          if (n == 2) return true;
          if (n % 2 == 0) return false;
          for (int i = 3; (long) i * i <= n; i += 2) {
            if (n % i == 0) return false;
          }
          return true;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution027.java"
  - language: "javascript"
    code: |
      function isPrime(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i * i <= n; i += 2) {
          if (n % i === 0) return false;
        }
        return true;
      }
      
      function consecutivePrimes(a, b) {
        let n = 0;
        while (isPrime(n * n + a * n + b)) {
          n++;
        }
        return n;
      }
      
      module.exports = {
        answer: () => {
          let maxCount = 0;
          let result = 0;
      
          for (let a = -999; a < 1000; a++) {
            for (let b = -1000; b <= 1000; b++) {
              const count = consecutivePrimes(a, b);
              if (count > maxCount) {
                maxCount = count;
                result = a * b;
              }
            }
          }
      
          return result;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution027.js"
  - language: "python"
    code: |
      def solve():
          """
          Quadratic primes
          Euler discovered the remarkable quadratic formula: n² + n + 41.
          It turns out that the formula n² + 79n + 1601 can produce 80 primes for the consecutive
          values 0 ≤ n ≤ 79. The product of the coefficients, −79 and 1601, is −126479.
          Considering quadratics of the form: n² + an + b, where |a| < 1000 and |b| ≤ 1000,
          find the product of the coefficients, a and b, for the quadratic expression that produces
          the maximum number of primes for consecutive values of n, starting with n = 0.
          https://projecteuler.net/problem=27
          """
          def is_prime(n):
              if n < 2:
                  return False
              if n == 2:
                  return True
              if n % 2 == 0:
                  return False
              for i in range(3, int(n**0.5) + 1, 2):
                  if n % i == 0:
                      return False
              return True
      
          best_count, best_product = 0, 0
          for a in range(-999, 1000):
              for b in range(-1000, 1001):
                  n = 0
                  while is_prime(n * n + a * n + b):
                      n += 1
                  if n > best_count:
                      best_count = n
                      best_product = a * b
          return best_product
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler027.py"
  - language: "ruby"
    code: |
      def is_prime(n)
        return false if n < 2
        (2..Math.sqrt(n).to_i).each do |i|
          return false if n % i == 0
        end
        true
      end
      
      def euler027_solution
        max_count = 0
        max_product = 0
        (-999..999).each do |a|
          (-1000..1000).each do |b|
            count = 0
            n = 0
            loop do
              value = n * n + a * n + b
              break unless is_prime(value)
              count += 1
              n += 1
            end
            if count > max_count
              max_count = count
              max_product = a * b
            end
          end
        end
        max_product
      end
      
      puts euler027_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler027.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func isPrime27(n int) bool {
          if n < 2 {
              return false
          }
          if n == 2 {
              return true
          }
          if n%2 == 0 {
              return false
          }
          for i := 3; i*i <= n; i += 2 {
              if n%i == 0 {
                  return false
              }
          }
          return true
      }
      
      func main() {
          bestProduct, bestStreak := 0, 0
          for a := -999; a < 1000; a++ {
              for b := -999; b < 1000; b++ {
                  n := 0
                  for isPrime27(n*n + a*n + b) {
                      n++
                  }
                  if n > bestStreak {
                      bestStreak = n
                      bestProduct = a * b
                  }
              }
          }
          fmt.Println(bestProduct)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler027.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=27
      //
      // Euler discovered the remarkable quadratic formula: n² + n + 41
      // It turns out that the formula n² − 79n + 1601 is remarkable: for n = 0 to 79 it
      // produces 80 primes.
      //
      // Considering quadratics of the form: n² + an + b, where |a| < 1000 and |b| ≤ 1000,
      // find the product of the coefficients, a and b, for the quadratic expression that
      // produces the maximum number of primes for consecutive values of n, starting with n = 0.
      //
      // Answer: -59231
      
      fn is_prime(n: i64) -> bool {
          if n < 2 {
              return false;
          }
          if n == 2 {
              return true;
          }
          if n % 2 == 0 {
              return false;
          }
          let mut i = 3i64;
          while i * i <= n {
              if n % i == 0 {
                  return false;
              }
              i += 2;
          }
          true
      }
      
      pub fn quadratic_primes() -> i64 {
          let mut best_count = 0i64;
          let mut best_product = 0i64;
          for a in -999i64..1000 {
              for b in -1000i64..=1000 {
                  let mut n = 0i64;
                  while is_prime(n * n + a * n + b) {
                      n += 1;
                  }
                  if n > best_count {
                      best_count = n;
                      best_product = a * b;
                  }
              }
          }
          best_product
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_027() {
              assert_eq!(quadratic_primes(), -59231);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler027.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background
This problem explores [quadratic](https://grokipedia.com/page/Quadratic_equation) polynomials that generate prime numbers for consecutive integer inputs. Euler's remarkable formula $n^2 + n + 41$ produces primes for $n = 0$ to $39$, while the more impressive $n^2 - 79n + 1601$ generates $80$ consecutive primes. The challenge requires finding coefficients $a$ and $b$ in the general quadratic $n^2 + an + b$ that maximize the length of such prime-generating sequences, subject to the constraints $|a| < 1000$ and $|b| \le 1000$.

### Algorithm Analysis
The solution employs a brute-force approach, iterating over all possible coefficient pairs within the given bounds. For each pair $(a, b)$, it evaluates the quadratic formula for consecutive $n$ starting from $0$ until a non-prime value is encountered. Primality testing uses trial division up to $\sqrt{n}$, optimized with the $6k\pm1$ sieve pattern for efficiency. The algorithm's time complexity is $O(A \times B \times N \times \sqrt{P})$, where $A$ and $B$ are the coefficient ranges (approximately $2 \times 10^6$ iterations), $N$ is the maximum prime streak length (around $80$), and $P$ is the largest quadratic value tested (up to $10^6$).

### Key Insights
For $n=0$, the quadratic evaluates to $b$, requiring $b$ to be prime and positive (since negative primes aren't considered in this context). For $n=1$, the expression becomes $1 + a + b$, which must also be prime. The optimal solution produces $71$ consecutive primes with coefficients $a = -61$ and $b = 971$, yielding the product $-59231$.

### Educational Value
This problem demonstrates the application of number theory in computational algorithms, combining prime generation with polynomial evaluation. It teaches efficient primality testing, brute-force optimization techniques, and the importance of mathematical constraints in algorithm design. The solution highlights how seemingly simple mathematical formulas can lead to complex computational challenges requiring careful analysis of edge cases and performance considerations.
