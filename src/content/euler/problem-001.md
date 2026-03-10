---
problemNumber: 1
title: "Multiples of 3 and 5"
description: |
  If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

  Find the sum of all the multiples of 3 or 5 below 1000.
difficulty: "easy"
date: 2014-12-30
technologies: ["cpp", "java", "javascript", "php", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      int sum_natural_35(size_t upper)
      {
        unsigned int sum(0);
        for( int i = upper ; --i; )
        {
          if( 0 == i % 3 )
          {
            sum += i;
          }
          else if ( 0 == i % 5 )
          {
            sum += i;
          }
        }
        return sum;
      }

      int main(int argc, char* argv[])
      {
        std::cout << sum_natural_35(1000) << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler001.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      public class Euler001 {
          public static void main(String[] args) {
              int sum = 0;
              for (int i = 1; i < 1000; i++) {
                  if (i % 3 == 0 || i % 5 == 0) {
                      sum += i;
                  }
              }
              System.out.println(sum);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler001.java"
  - language: "javascript"
    code: |
      function euler001() {
          let sum = 0;
          for (let i = 1; i < 1000; i++) {
              if (i % 3 === 0 || i % 5 === 0) {
                  sum += i;
              }
          }
          return sum;
      }

      console.log(euler001());
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler001.js"
  - language: "php"
    code: |
      <?php
      $sum = 0;
      for ($i = 1; $i < 1000; $i++) {
          if ($i % 3 == 0 || $i % 5 == 0) {
              $sum += $i;
          }
      }
      echo $sum;
      ?>
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/php/src/euler001.php"
  - language: "ruby"
    code: |
      #!/usr/bin/env ruby
      def euler001_solution
        sum = 0
        (0..999).each do |num|
          if num % 3 == 0 || num % 5 == 0
            sum += num
          end
        end
        sum
      end

      puts euler001_solution
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler001.rb"
  - language: "go"
    code: |
      package main

      import "fmt"

      func main() {
          sum := 0
          for i := 1; i < 1000; i++ {
              if i%3 == 0 || i%5 == 0 {
                  sum += i
              }
          }
          fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler001.go"
  - language: "rust"
    code: |
      fn main() {
          let mut sum = 0;
          for i in 1..1000 {
              if i % 3 == 0 || i % 5 == 0 {
                  sum += i;
              }
          }
          println!("{}", sum);
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler001.rs"
tags: ["euler", "multiples", "sum"]
featured: true
showcase: true
---

## Solution Notes

### Mathematical Background

This problem introduces the concept of finding multiples and summing them, which relates to arithmetic sequences. The inclusion-exclusion principle becomes relevant when dealing with numbers that are multiples of both 3 and 5 (i.e., multiples of 15).

The sum of multiples can be calculated using the formula for arithmetic series: $S = \frac{n(n+1)}{2} \times d$ where $n$ is the number of terms and $d$ is the common difference.

### Algorithm Analysis

The implementations shown use a brute-force approach: iterate through all numbers below 1000 and sum those divisible by 3 or 5. This has O(n) time complexity where n = 1000.

A more efficient mathematical approach would use:
- Sum of multiples of 3: $S_3 = 3 + 6 + 9 + \dots + 999 = 3(1 + 2 + 3 + \dots + 333) = 3 \times \frac{333 \times 334}{2}$
- Sum of multiples of 5: $S_5 = 5 + 10 + 15 + \dots + 995 = 5(1 + 2 + 3 + \dots + 199) = 5 \times \frac{199 \times 200}{2}$
- Sum of multiples of 15: $S_{15} = 15 + 30 + 45 + \dots + 990 = 15(1 + 2 + 3 + \dots + 66) = 15 \times \frac{66 \times 67}{2}$

Final sum: $S_3 + S_5 - S_{15}$ (inclusion-exclusion)

### Key Insights

- Numbers that are multiples of both 3 and 5 (like 15, 30, 45...) would be counted twice without proper handling
- The mathematical approach is much more efficient for large limits
- This problem teaches fundamental programming concepts: loops, conditionals, and modular arithmetic

### Educational Value

This problem serves as an excellent introduction to Project Euler, teaching:
- Basic programming constructs (loops and conditionals)
- Modular arithmetic and divisibility
- The importance of considering edge cases (multiples of both numbers)
- The trade-off between simple iterative solutions and optimized mathematical formulas
- How computational complexity affects solution choice