---
problemNumber: 19
title: "Counting Sundays"
description: "You are given the following information, but you may prefer to do some research for additional details. - The Gregorian calendar was adopted on 15 October 1582. - 1 January 1900 was a Monday. - Thirty days has September, April, June and November. All the rest have thirty-one, Saving February alone, Which has twenty-eight, rain or shine. And on leap years, twenty-nine. - A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400. How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)? Answer: 171"
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=19
      // Counting Sundays
      
      // You are given the following information, but you may prefer to do some research for yourself.
      //
      // - 1 Jan 1900 was a Monday.
      // - Thirty days has September,
      // - April, June and November.
      // - All the rest have thirty-one,
      // - Saving February alone,
      // - Which has twenty-eight, rain or shine.
      // - And on leap years, twenty-nine.
      // - A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
      //
      // How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
      
      // Answer: 171
      
      #include <iostream>
      #include <cmath>
      
      int is_first_sunday(int y, int m)
      {
          // @see http://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Gauss.27_algorithm
          static int t[] = { 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 };
          y -= m < 3;
          return 0 == std::floor(( y + y/4 - y/100 + y/400 + t[m-1] + 1) % 7);
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
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << counting_sundays() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler019.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution019 implements Solution {
        public String solve() {
          int dayOfWeek = 1; // 1 Jan 1900 was Monday (0=Sun, 1=Mon, ..., 6=Sat)
          int sundays = 0;
      
          // Advance to 1 Jan 1901
          dayOfWeek = (dayOfWeek + 365) % 7; // 1900 was not leap year
      
          for (int year = 1901; year <= 2000; year++) {
            for (int month = 1; month <= 12; month++) {
              if (dayOfWeek == 0) { // Sunday
                sundays++;
              }
              // Advance to next month
              dayOfWeek = (dayOfWeek + daysInMonth(month, year)) % 7;
            }
          }
      
          return Integer.toString(sundays);
        }
      
        private int daysInMonth(int month, int year) {
          switch (month) {
            case 4: case 6: case 9: case 11: return 30;
            case 2: return isLeapYear(year) ? 29 : 28;
            default: return 31;
          }
        }
      
        private boolean isLeapYear(int year) {
          if (year % 4 != 0) return false;
          if (year % 100 != 0) return true;
          return year % 400 == 0;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution019.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          let dayOfWeek = 1; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
          let sundays = 0;
      
          // Start from 1900 to get the correct day alignment
          for (let year = 1900; year <= 2000; year++) {
            for (let month = 0; month < 12; month++) {
              // Skip 1900, only count from 1901-2000
              if (year >= 1901 && dayOfWeek === 0) {
                sundays++;
              }
      
              // Calculate days in this month
              let days = daysInMonth[month];
              if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
                days = 29; // February in leap year
              }
      
              // Move to first day of next month
              dayOfWeek = (dayOfWeek + days) % 7;
            }
          }
      
          return sundays;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution019.js"
  - language: "python"
    code: |
      def solve():
          """
          Counting Sundays
          You are given the following information, but you may prefer to do some research for yourself.
          1 Jan 1900 was a Monday.
          Thirty days has September,
          April, June and November.
          All the rest have thirty-one,
          Saving February alone,
          Which has twenty-eight, rain or shine.
          And on leap years, twenty-nine.
          A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
          How many Sundays fell on the first of the month during the twentieth century
          (1 Jan 1901 to 31 Dec 2000)?
          """
          import calendar
          count = 0
          for year in range(1901, 2001):
              for month in range(1, 13):
                  if calendar.monthrange(year, month)[0] == 6:  # 6 is Sunday (0=Monday)
                      count += 1
          return count
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler019.py"
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
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler019.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func daysInMonth(year, month int) int {
      
          days := []int{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
      
          if month == 2 && isLeap(year) {
      
              return 29
      
          }
      
          return days[month-1]
      
      }
      
      func isLeap(year int) bool {
      
          return year%4 == 0 && (year%100 != 0 || year%400 == 0)
      
      }
      
      func main() {
      
          count := 0
      
          day := 2 // 1901-01-01 is Tuesday (1900-01-01 Monday, 365 days later Tuesday)
      
          for year := 1901; year <= 2000; year++ {
      
              for month := 1; month <= 12; month++ {
      
                  if day == 0 {
      
                      count++
      
                  }
      
                  days := daysInMonth(year, month)
      
                  day = (day + days) % 7
      
              }
      
          }
      
          fmt.Println(count)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler019.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=19
      //
      // You are given the following information, but you do not need to use it for your calculation:
      //
      // During the twentieth century (1 Jan 1901 to 31 Dec 2000), how many Sundays fell on the first of the month?
      //
      // Answer: 171
      
      pub fn counting_sundays() -> usize {
          let days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          let mut day_counter = 2; // 1901-01-01 is Tuesday (0=Sunday, 1=Monday, 2=Tuesday)
          let mut count = 0;
          for year in 1901..=2000 {
              for month in 0..12 {
                  if day_counter % 7 == 0 {
                      count += 1;
                  }
                  let mut days = days_in_month[month];
                  if month == 1 && is_leap(year) {
                      days = 29;
                  }
                  day_counter += days;
              }
          }
          count
      }
      
      fn is_leap(year: u32) -> bool {
          year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_019() {
              assert_eq!(counting_sundays(), 171);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler019.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 19: Counting Sundays.

You are given the following information, but you may prefer to do some research for additional details. - The Gregorian calendar was adopted on 15 October 1582. - 1 January 1900 was a Monday. - Thirty days has September, April, June and November. All the rest have thirty-one, Saving February alone, Which has twenty-eight, rain or shine. And on leap years, twenty-nine. - A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400. How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)? Answer: 171
