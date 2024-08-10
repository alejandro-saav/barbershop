export function parseTime(timeStr) {
  const [time12h, period] = timeStr.split(/(?=[ap]m)/i);
  let [hour, minute] = time12h.split(":").map((part) => parseInt(part));
  if (period.toLowerCase() === "pm" && hour !== 12) {
    hour += 12;
  } else if (period.toLowerCase() === "am" && hour === 12) {
    hour = 0;
  }
  return [hour, minute];
}

export function formatTime(hour, minutes) {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHour
    .toString()
    .padStart(2, "0")}:${formattedMinutes}${period}`;
}

export function getHalfHourIntervals() {
  const startHour = 10; // 10 AM
  const endHour = 21; // 9 PM (21 in 24-hour format)
  const intervals = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    intervals.push(formatTime(hour, 0)); // Add the full hour (e.g., 10:00 AM)
    if (hour !== endHour) {
      // Add the half-hour (e.g., 10:30 AM), but not after the last full hour (9 PM)
      intervals.push(formatTime(hour, 30));
    }
  }

  return intervals;
}

export function calculateEndTime(startTimeStr, totalTimeInMinutes) {
  // Parse the start time
  if (startTimeStr == "") return;
  const [startHour, startMinute] = parseTime(startTimeStr);

  // Calculate end time in minutes since midnight
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = startMinutes + totalTimeInMinutes;

  // Convert end time in minutes back to hours and minutes
  const endHour = Math.floor(endMinutes / 60);
  const endMinute = endMinutes % 60;

  // Format the end time
  const endTimeStr = formatTime(endHour, endMinute);

  return endTimeStr;
}

export function sumTimeByCondition(timesArray, conditionsArray) {
  let totalTime = 0;

  for (let i = 0; i < timesArray.length; i++) {
    if (conditionsArray[i]) {
      const timeStr = timesArray[i].duracion;
      totalTime += timeStr;
    }
  }

  return totalTime;
}

export function calcularTiempoEnHorasMinutos(minutos) {
  let horas = 0;
  let minutosFinale = 0;
  let strFinal = "";
  if (minutos > 60) {
    horas = Math.trunc(minutos / 60);
    minutosFinale = minutos % 60;
    strFinal = `${horas} ${
      horas > 1 ? "horas" : "hora"
    } y ${minutosFinale} minutos`;
  } else if (minutos === 60) {
    horas = 1;
    minutosFinale = 0;
    strFinal = `${horas} ${horas > 1 ? "horas" : "hora"}`;
  } else {
    horas = "";
    minutosFinale = minutos % 60;
    strFinal = `${minutosFinale} minutos`;
  }
  return strFinal;
}

export function cambiarFormato12a24(tiempo) {
  let finalTime;
  const horas = Number(tiempo.slice(0, 2));
  const timeType = tiempo.slice(-2);
  if (timeType === "AM") {
    if (horas < 12) {
      finalTime = tiempo.slice(0, 5);
    } else {
      finalTime = `00${tiempo.slice(2, 5)}`;
    }
  } else if (timeType === "PM") {
    if (horas == 12) {
      finalTime = tiempo.slice(0, 5);
    } else {
      finalTime = `${horas + 12}${tiempo.slice(2, 5)}`;
    }
  }
  return finalTime;
}

export function calculateEndTimes(appointments, services) {
  // Group appointments by id
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    if (!acc[appointment.id]) {
      acc[appointment.id] = [];
    }
    acc[appointment.id].push(appointment);
    return acc;
  }, {});

  // Calculate end time for each group
  return Object.entries(groupedAppointments).map(([id, appts]) => {
    const startTime = new Date(`1970-01-01T${appts[0].hora_cita}`);
    const totalDuration = appts.reduce((sum, appt) => {
      const service = services.find((s) => s.id === appt.id_servicio);
      return sum + (service ? service.duracion : 0);
    }, 0);

    const endTime = new Date(startTime.getTime() + totalDuration * 60000);
    return {
      id: parseInt(id),
      startTime: appts[0].hora_cita,
      endTime: endTime.toTimeString().slice(0, 5),
      services: appts.map((appt) => appt.id_servicio),
    };
  });
}

export function removeBookedHours(horas, appointments) {
  // Convert 12-hour format to 24-hour format
  const to24Hour = (time12h) => {
    const [time, modifier] = time12h.split(/(?<=\d)(?=[AP]M)/);
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  // Convert 24-hour format to Date object
  const toDate = (time24h) => new Date(`1970-01-01T${time24h}`);

  // Check if a time is within a range
  const isWithinRange = (time, start, end) => {
    const timeDate = toDate(to24Hour(time));
    return timeDate >= start && timeDate < end;
  };

  // Get all booked time ranges
  const bookedRanges = appointments.map((app) => ({
    start: toDate(app.startTime),
    end: toDate(app.endTime),
  }));

  // Filter out booked hours
  return horas.filter(
    (hora) =>
      !bookedRanges.some((range) => isWithinRange(hora, range.start, range.end))
  );
}
