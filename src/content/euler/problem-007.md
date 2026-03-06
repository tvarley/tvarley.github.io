---
problemNumber: 7
title: "10001st prime"
description: "By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13. What is the 10001st prime number?"
difficulty: "easy"
date: 2015-01-13
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <memory>

      #include "sieve_eratos.h"

      int nth_prime(size_t nth)
      {
        std::unique_ptr<CSieveOfEratosthenes> sieve(new CSieveOfEratosthenes(110000));
        if( sieve ){
          return sieve->get_nth(nth);
        }
        return 0;
      }

      int main( int argc , char* argv[])
      {
        std::cout << "Answer: " << nth_prime(10001) << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler007.cpp"
    performance: "O(n log log n) time complexity using Sieve of Eratosthenes"
  - language: "ruby"
    code: |
      #!/usr/bin/env ruby
      require 'prime'

      def find_10001_prime
        sieve = Prime::EratosthenesGenerator.new
        answer = 0
        10_001.times { |_i| answer = sieve.next }
        answer
      end

      puts find_10001_prime if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler007.rb"
tags: ["euler", "primes", "sieve"]
featured: false
showcase: true
---

## Additional Notes

This problem introduces prime number generation, a fundamental topic in number theory. The solution demonstrates the use of the Sieve of Eratosthenes algorithm for efficient prime finding.

The C++ implementation uses a custom sieve class for optimal performance, while the Ruby version leverages the built-in Prime library for simplicity.