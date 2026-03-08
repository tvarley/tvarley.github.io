---
problemNumber: 10
title: "Summation of primes"
description: |
  The sum of the primes below 10 is:

  \(2 + 3 + 5 + 7 = 17\)

  Find the sum of all the primes below two million.
difficulty: "easy"
date: 2015-01-30
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>

      #include "sieve_eratos.h"

      using namespace std;

      int main(int argc, char* argv[] )
      {
        CSieveOfEratosthenes* cs = new CSieveOfEratosthenes(20000000);
        cout << "Answer: " << cs->sum(2000000) << endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler010.cpp"
    performance: "O(n log log n) time complexity using Sieve of Eratosthenes"
  - language: "ruby"
    code: |
      #!/usr/bin/env ruby
      require 'prime'

      def sum_primes
        sieve = Prime::EratosthenesGenerator.new
        prime_sum = 0
        prime = sieve.next
        while prime <= 2_000_000
          prime_sum += prime
          prime = sieve.next
        end
        prime_sum
      end

      puts sum_primes if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler010.rb"
tags: ["euler", "primes", "sum"]
featured: false
showcase: true
---

## Additional Notes

This problem involves calculating the sum of all prime numbers below 2 million. Both implementations use the Sieve of Eratosthenes algorithm - the C++ version uses a custom sieve class for optimal performance, while the Ruby version leverages the built-in Prime library.