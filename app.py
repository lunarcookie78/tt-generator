from flask import Flask, render_template, jsonify, request
import webbrowser

master_tt_a = {
    "Mon": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Tue": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Wed": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Thu": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Fri": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
}

master_tt_b = {
    "Mon": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Tue": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Wed": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Thu": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Fri": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
}
master_tt_c = {
    "Mon": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Tue": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Wed": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Thu": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
    "Fri": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
    },
}


app = Flask(__name__, static_folder="static", static_url_path="/static")


def generate_tt(teacher_data):
    if (
        master_tt_a["Fri"]["7"] != ""
        and master_tt_b["Fri"]["7"] != ""
        and master_tt_c["Fri"]["7"] != ""
    ):
        return "All Full"
    teacher_name = teacher_data[0]
    subject = teacher_data[1]
    section = teacher_data[2]
    if section == "A":
        if master_tt_a["Fri"]["7"] != "":
            return "A Full"
    elif section == "B":
        if master_tt_b["Fri"]["7"] != "":
            return "B Full"
    else:
        if master_tt_c["Fri"]["7"] != "":
            return "C Full"
    addn_subs = teacher_data[6]
    if addn_subs:
        subjects = [subject, *addn_subs.split(", ")]
    else:
        subjects = [subject]
    subidx = 0
    if section == "A":
        for day in master_tt_a.keys():
            for period in master_tt_a[day].keys():
                if master_tt_a[day][period] == "" and subidx < len(subjects):
                    master_tt_a[day][period] = f"{subjects[subidx]}"
                    if "handled by" not in master_tt_a[day][period]:
                        master_tt_a[day][period] += f" handled by {teacher_name}"
                    subidx += 1
        return "Success"
    if section == "B":
        for day in master_tt_b.keys():
            for period in master_tt_b[day].keys():
                if master_tt_b[day][period] == "" and subidx < len(subjects):
                    master_tt_b[day][period] = f"{subjects[subidx]}"
                    if "handled by" not in master_tt_b[day][period]:
                        master_tt_b[day][period] += f" handled by {teacher_name}"
                    subidx += 1
        return "Success"
    if section == "C":
        for day in master_tt_c.keys():
            for period in master_tt_c[day].keys():
                if master_tt_c[day][period] == "" and subidx < len(subjects):
                    master_tt_c[day][period] = f"{subjects[subidx]}"
                    if "handled by" not in master_tt_c[day][period]:
                        master_tt_c[day][period] += f" handled by {teacher_name}"
                    subidx += 1
        return "Success"


@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@app.route("/generate-timetable", methods=["POST"])
def generate_timetable():
    teacher_data = request.get_json()
    teacher_section = teacher_data[2]
    message = generate_tt(teacher_data)
    if message != "Success":
        return jsonify({"message": message, "alert": True})
    if teacher_section == "A":
        return jsonify({"message": message, "timetable": master_tt_a})
    elif teacher_section == "B":
        return jsonify({"message": message, "timetable": master_tt_b})
    else:
        return jsonify({"message": message, "timetable": master_tt_c})


if __name__ == "__main__":
    webbrowser.open("http://127.0.0.1:6969")
    app.run(port=6969)