---
problemNumber: 1
title: "Multiples of 3 and 5"
description: "If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 or 5 below 1000."
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
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler001.go"
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

## Additional Notes

This is one of the simplest Project Euler problems, often used as an introduction to programming challenges. The solution demonstrates basic loop iteration and conditional logic.

The mathematical approach can be optimized using the formula for the sum of an arithmetic series, but the brute force approach shown here is sufficient for small inputs like 1000.