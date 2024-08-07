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
  return `${formattedHour}:${formattedMinutes}${period}`;
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
