---
problemNumber: 9
title: "Special Pythagorean triplet"
description: |
  A Pythagorean triplet is a set of three natural numbers, \(a < b < c\), for which:

  \(a^2 + b^2 = c^2\)

  For example:

  \(3^2 + 4^2 = 9 + 16 = 25 = 5^2\)

  There exists exactly one Pythagorean triplet for which \(a + b + c = 1000\). Find the product \(abc\).
difficulty: "easy"
date: 2015-01-18
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>

      using namespace std;

      int special_pyg_brute()
      {
        for(int a = 500; --a; ){
          for(int b = 500; --b; ){
            int c = 1000 - b - a;
            if( a < b && (0==(a*a)+(b*b)-(c*c)) ){
              return a*b*c;
            }
          }
        }
        return 0;
      }

      int main( int argc, char* argv[] )
      {
        std::cout << "Answer: " << special_pyg_brute() << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler009.cpp"
    performance: "O(n²) time complexity with optimized bounds"
  - language: "ruby"
    code: |
      #!/usr/bin/env ruby
      def pyg(limit)
        # We can limit the range of a and b because of the following requirements:
        # a < b < c
        # a + b + c = 1000
        (1..limit / 3).each do |a|
          (a..limit / 2).each do |b|
            c = 1000 - b - a
            return (a * b * c) if (a * a) + (b * b) == (c * c)
          end
        end
      end

      puts pyg(1000) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler009.rb"
tags: ["euler", "pythagorean", "triplet"]
featured: false
showcase: true
---

## Additional Notes

This problem requires finding the unique Pythagorean triplet where a + b + c = 1000. The solution uses brute force iteration with mathematical bounds to efficiently search for the triplet. The C++ version includes both a basic and optimized approach, while the Ruby version uses a clean iterative method with range constraints.