import mariadb
import sys
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import os

"""
 @Project: Discord Virtual Assistant
 @Title: generate_figures.py
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Creates figures to track usage of DVA

 @Changelog:
 3/29/2022 IS: Basic database connection, data processing, and figure generation
"""

try:
    conn = mariadb.connect(
        user=os.environ.get('DVA_DATABASE_USER'),
        password=os.environ.get('DVA_DATABASE_PASSWORD'),
        host=os.environ.get('DVA_DATABASE_HOST'),
        database="dva"

    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()

cur.execute("SELECT time FROM record_usage")

dates = []
for t in cur:
    dates.append(t[0].date())

usage_per_day = []
while len(dates) > 0:
    count = 0
    d0 = dates[0]

    # count occurrences of d0
    for d in dates:
        if d == d0:
            count += 1

    # remove all occurrences of d0
    dates = [i for i in dates if i != d0]

    usage_per_day.append((d0, count))

usage_per_day.sort()

day, usage = zip(*usage_per_day)

plt.bar(day, usage)
plt.title("record command usage")
plt.xlabel('Days')
plt.xticks(rotation='vertical')

plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d/%Y'))
plt.gca().xaxis.set_major_locator(mdates.DayLocator())

plt.ylabel('Usage')

plt.autoscale()
plt.subplots_adjust(bottom=0.25)

plt.savefig("record_usage_figure.png")
plt.show()

cur.execute("SELECT command FROM command_usage")

commands = []
for command in cur:
    commands.append(command[0])
commands.sort()

commands_usage = []
while len(commands) > 0:
    count = 0
    c0 = commands[0]

    # count occurrences of d0
    for d in commands:
        if d == c0:
            count += 1

    # remove all occurrences of d0
    commands = [i for i in commands if i != c0]

    commands_usage.append((c0, count))

command, usage = zip(*commands_usage)

plt.bar(command, usage)
plt.title("voice command usage")
plt.xlabel('command')


plt.ylabel('Usage')

plt.autoscale()
# plt.subplots_adjust(bottom=0.25)

plt.savefig("command_usage_figure.png")
plt.show()
