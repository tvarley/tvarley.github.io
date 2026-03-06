---
problemNumber: 19
title: "Counting Sundays"
description: "You are given the following information, but you may prefer to do some research for yourself. - 1 Jan 1900 was a Monday. - Thirty days has September, April, June and November. All the rest have thirty-one, Saving February alone, Which has twenty-eight, rain or shine. And on leap years, twenty-nine. - A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400. How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?"
difficulty: "easy"
date: 2015-02-18
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>

      int is_first_sunday(int y, int m)
      {
          // @see http://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Gauss.27_algorithm
          static int t[] = { 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 };
          y -= m < 3;
          return 0 == (y + y/4 - y/100 + y/400 + t[m-1] + 1) % 7;
      }

      int counting_sundays()
      {
        int suns = 0;

        for (size_t y = 1901; y <= 2000; y++) {
          for (size_t m = 1; m <= 12; m++) {
            if( is_first_sunday(y,m) ){
              suns++;
            }
          }
        }
        return suns;
      }

      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << counting_sundays() << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler019.cpp"
    performance: "O(1) time complexity per date check"
  - language: "ruby"
    code: |
      require 'date'

      def first_sunday?(month, year)
        # @see http://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Gauss.27_algorithm
        offsets = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4].freeze
        year -= 1 if month < 3
        ((year + year / 4 - year / 100 + year / 400 + offsets[month - 1] + 1) % 7).zero?
      end

      def counting_sundays(start_date, end_date)
        suns = 0
        current = start_date
        while current <= end_date
          current = current >> 1
          suns += 1 if first_sunday?(current.month, current.year)
        end
        suns
      end

      start_date = DateTime.parse('1/1/1901')
      end_date = DateTime.parse('31/12/2000')
      puts counting_sundays(start_date, end_date) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler019.rb"
tags: ["euler", "calendar", "sundays"]
featured: false
showcase: true
---

## Additional Notes

This problem involves counting Sundays that fall on the first of the month from 1901 to 2000. Both solutions use Gauss's algorithm to efficiently determine the day of the week for any date. The C++ version implements the algorithm manually, while the Ruby version uses the DateTime library for iteration and the algorithm for day calculation.