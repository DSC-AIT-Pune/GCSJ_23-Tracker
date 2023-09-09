import csv
import json

# Specify the input CSV file name
input_file_name = "data.csv"

# Define field names for the JSON object, excluding "Email"
field_names = [
    "Student Name",
    "Institution",
    "Enrolment Date & Time",
    "Enrolment Status",
    "Google Cloud Skills Boost Profile URL",
    "# of Courses Completed",
    "# of Skill Badges Completed",
    "# of GenAI Game Completed",
    "Total Completions of both Pathways",
    "Redemption Status"
]

# Initialize a list to store JSON objects
json_data_list = []

# Read CSV data from the input file
with open(input_file_name, mode='r') as csv_file:
    csv_reader = csv.reader(csv_file)
    for csv_data in csv_reader:
        data_dict = {}
        for i in range(len(field_names)):
            j =i
            if i >= 1:
                j +=1
            data_dict[field_names[i]] = csv_data[j]
            
        json_data_list.append(data_dict)

# Specify the output JSON file name
output_file_name = "output.json"

# Write the list of JSON objects to the output file
with open(output_file_name, "w") as output_file:
    json.dump(json_data_list, output_file, indent=4)

